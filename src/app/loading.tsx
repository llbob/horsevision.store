import Container from "@/app/_components/container";
import Image from "next/image";
import { getIndexPage } from "../lib/api";

export default function Loading() {
  // Get the page data for the loading image
  const page = getIndexPage();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Container>
        {page?.pageLoadImage && (
          <div className="mb-8 flex justify-center">
            <Image
              src={page.pageLoadImage}
              alt="Loading"
              width={300}
              height={300}
              className="w-auto h-auto"
            />
          </div>
        )}
        <div className="h-1 w-full bg-gray-200">
          <div className="h-1 bg-black animate-loading-bar"></div>
        </div>
      </Container>
    </main>
  );
}