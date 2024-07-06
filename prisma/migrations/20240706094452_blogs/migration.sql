-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publish_date" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "blog_image" TEXT NOT NULL,
    "total_likes" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
