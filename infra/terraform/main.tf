locals {
  s3_bucket_name               = "pesto-task-mgmt"
  api_origin_id                = "api-origin-id"
  s3_origin_cache_policy_id    = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  api_origin_cache_policy_id   = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
  api_origin_request_policy_id = "59781a5b-3903-41f3-afcb-af62929ccde1"
}

resource "aws_s3_bucket" "main" {
  bucket = local.s3_bucket_name
}

resource "aws_s3_bucket_public_access_block" "main" {
  bucket                  = aws_s3_bucket.main.id
  block_public_acls       = false
  block_public_policy     = false
  restrict_public_buckets = false
  ignore_public_acls      = false
}

resource "aws_s3_bucket_policy" "s3_allow_get_object_cloudfront" {
  bucket = aws_s3_bucket.main.id
  policy = data.aws_iam_policy_document.s3_allow_get_object_cloudfront.json
}

data "aws_iam_policy_document" "s3_allow_get_object_cloudfront" {
  version = "2008-10-17"
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
    ]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    resources = ["${aws_s3_bucket.main.arn}/*"]
    condition {
      test     = "StringEquals"
      variable = "aws:SourceArn"
      values   = [aws_cloudfront_distribution.main.arn]
    }
  }
}


resource "aws_cloudfront_distribution" "main" {
  enabled             = true
  default_root_object = "/index.html"
  is_ipv6_enabled     = true
  wait_for_deployment = true

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD"]
    cache_policy_id        = local.s3_origin_cache_policy_id
    target_origin_id       = aws_s3_bucket.main.bucket
    viewer_protocol_policy = "redirect-to-https"
  }

  origin {
    domain_name              = aws_s3_bucket.main.bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.main.id
    origin_id                = aws_s3_bucket.main.id
  }

  origin {
    domain_name = "pesto-task-mgmt.onrender.com"
    origin_id   = local.api_origin_id
    custom_origin_config {
      http_port              = 80
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
      https_port             = 443
    }
  }

  ordered_cache_behavior {
    path_pattern             = "/api/*"
    allowed_methods          = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods           = ["GET", "HEAD"]
    cache_policy_id          = local.api_origin_cache_policy_id
    target_origin_id         = local.api_origin_id
    viewer_protocol_policy   = "redirect-to-https"
    origin_request_policy_id = local.api_origin_request_policy_id
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_code            = 403
    error_caching_min_ttl = 10
    response_code         = 200
    response_page_path    = "/index.html"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

}

resource "aws_cloudfront_origin_access_control" "main" {
  name                              = "s3-cloudfront-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
