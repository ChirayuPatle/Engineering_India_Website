import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { blog } from "@/database/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth-helpers";

// GET: Fetch all blogs
export async function GET() {
  try {
    const authResult = await requireAdmin();

    if (!authResult.authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blogs = await db.select().from(blog).orderBy(desc(blog.createdAt));
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

// POST: Create new blog
export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();

    if (!authResult.authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Generate slug from title if not provided
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newBlog = await db
      .insert(blog)
      .values({
        title: body.title,
        slug,
        excerpt: body.excerpt || null,
        content: body.content,
        coverImage: body.coverImage || null,
        author: body.author || null,
        authorId: authResult.user?.id || null,
        category: body.category || null,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        isPublished: body.isPublished || false,
        publishedAt: body.isPublished ? new Date() : null,
        viewCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(newBlog[0], { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
