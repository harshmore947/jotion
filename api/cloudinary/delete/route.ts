import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return new NextResponse("Public ID is required", { status: 400 });
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return new NextResponse("Failed to delete image", { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CLOUDINARY_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
