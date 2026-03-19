const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function cloudinaryUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: string; fetchFormat?: string } = {}
) {
  if (!cloudName) return publicId;
  const { width, height, crop = "fill", fetchFormat = "auto" } = options;
  const parts = [
    `https://res.cloudinary.com/${cloudName}/image/upload`,
    width && height ? `w_${width},h_${height},c_${crop}` : "",
    `f_${fetchFormat}`,
    publicId,
  ].filter(Boolean);
  return parts.join("/");
}
