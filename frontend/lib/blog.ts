import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogCluster = "infantil" | "adulto" | "tecnico";

export const CLUSTER_LABELS: Record<BlogCluster, string> = {
  infantil: "Taekwondo Infantil",
  adulto: "Taekwondo Adulto",
  tecnico: "Técnico",
};

export type BlogGalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type BlogMosaicImage = {
  src: string;
  alt: string;
  zoom?: number;
  focus?: string;
};

export type BlogVideoClip = {
  video: string;
  poster: string;
  alt: string;
};

export type BlogVideoStory = {
  title: string;
  description: string;
  clips: BlogVideoClip[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  cluster: BlogCluster;
  relatedHref: string;
  relatedLabel: string;
  content: string;
  coverImage?: string;
  coverAlt?: string;
  coverCaption?: string;
  mosaic: BlogMosaicImage[];
  gallery: BlogGalleryImage[];
  videoStories: BlogVideoStory[];
};

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      cluster: data.cluster as BlogCluster,
      relatedHref: data.relatedHref as string,
      relatedLabel: data.relatedLabel as string,
      content,
      coverImage: data.coverImage as string | undefined,
      coverAlt: data.coverAlt as string | undefined,
      coverCaption: data.coverCaption as string | undefined,
      mosaic: (data.mosaic as BlogMosaicImage[] | undefined) ?? [],
      gallery: (data.gallery as BlogGalleryImage[] | undefined) ?? [],
      videoStories: (data.videoStories as BlogVideoStory[] | undefined) ?? [],
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCluster(cluster: BlogCluster): BlogPost[] {
  return getAllPosts().filter((post) => post.cluster === cluster);
}
