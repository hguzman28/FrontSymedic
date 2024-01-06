



resource "aws_s3_bucket" "s3-bucket-example"{
    bucket = var.bucketName
    tags = var.tags
}

/* resource "aws_s3_bucket_acl" "s3-bucket-example" {
    bucket = aws_s3_bucket.s3-bucket-example.id
    acl = "public-read"
} */

/* resource "aws_s3_bucket_public_access_block" "public_block" {
  bucket = aws_s3_bucket.s3-bucket-example.id

  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
} */

/* resource "aws_s3_bucket_versioning" "versioning_example" {

    bucket = aws_s3_bucket.s3-bucket-example.id
    versioning_configuration {
    status = "Enabled"
    }
} */

/* resource "aws_s3_object" "object" {
  bucket = aws_s3_bucket.s3-bucket-example.id
  key    = "index.html"
  source = "index.html"
  tags = var.tags
  content_type = "text/html"

} */

resource "aws_s3_bucket_object" "files" {
  for_each = fileset("../build/", "**/*.*")

  bucket = aws_s3_bucket.s3-bucket-example.id
  key    = "./${each.value}"
  source = "../build/${each.value}"
  etag   = filemd5("../build/${each.value}")
  #content_type = "text/html" #content_type = "text/css" or content_type = "image/svg+xml" or content_type = "application/javascript" or content_type = "image/png"
  

}

#Upload files of your static website
resource "aws_s3_bucket_object" "html" {
  for_each = fileset("../build/", "**/*.html")

  bucket = aws_s3_bucket.s3-bucket-example.id
  key    = "./${each.value}"
  source = "../build/${each.value}"
  etag   = filemd5("../build/${each.value}")
  content_type = "text/html" #content_type = "text/css" or content_type = "image/svg+xml" or content_type = "application/javascript" or content_type = "image/png"
  

}


resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.s3-bucket-example.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

  routing_rule {
    condition {
      key_prefix_equals = "docs/"
    }
    redirect {
      replace_key_prefix_with = "documents/"
    }
  }
}

/* resource "aws_s3_bucket_policy" "allow_access_from_another_account" {
  bucket = aws_s3_bucket.s3-bucket-example.id
  policy = data.aws_iam_policy_document.allow_access_from_another_account.json
} */

data "aws_iam_policy_document" "allow_access_from_another_account" {
  statement {
    principals {
      #"*"
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      #aws_s3_bucket.s3-bucket-example.arn,
      "${aws_s3_bucket.s3-bucket-example.arn}/*",
    ]
  }
}