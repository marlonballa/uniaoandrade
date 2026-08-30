const REVALIDATE_SECONDS = 60 * 60 * 24 * 15; // 15 dias
const MAX_PAGES = 40; // teto de segurança: ~1000 posts (25 por página)

export type InstagramPost = {
  id: string;
  caption: string;
  permalink: string;
  imageUrl: string;
  engagement: number;
};

type GraphMediaItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  like_count?: number;
  comments_count?: number;
};

type GraphMediaResponse = {
  data?: GraphMediaItem[];
  paging?: { next?: string };
  error?: { message: string };
};

async function fetchAllMedia(userId: string, accessToken: string): Promise<GraphMediaItem[]> {
  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,like_count,comments_count";
  // Instagram API with Instagram Login ("Business Login for Instagram") —
  // host é graph.instagram.com, não graph.facebook.com, e não exige Página
  // do Facebook vinculada.
  let url: string | undefined =
    `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=25&access_token=${accessToken}`;

  const items: GraphMediaItem[] = [];

  for (let page = 0; url && page < MAX_PAGES; page++) {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    const json = (await res.json()) as GraphMediaResponse;

    if (!res.ok || json.error) {
      console.error("[instagram] Graph API respondeu com erro:", json.error?.message ?? res.status);
      break;
    }

    items.push(...(json.data ?? []));
    url = json.paging?.next;
  }

  return items;
}

/**
 * Busca TODOS os posts do Instagram (via "Instagram API with Instagram
 * Login" — graph.instagram.com, sem precisar de Página do Facebook —
 * paginando o histórico inteiro) e retorna os de maior engajamento
 * (curtidas + comentários) de sempre — não só os mais recentes. Requer
 * INSTAGRAM_USER_ID e INSTAGRAM_ACCESS_TOKEN configurados — sem eles,
 * retorna [] em silêncio (a seção que consome isto simplesmente não
 * renderiza).
 *
 * O cache do Next.js (`next.revalidate`) é o que implementa a atualização a
 * cada 15 dias: não há cron nem job separado — o próprio fetch só volta a
 * bater na API do Instagram depois desse prazo, servindo a versão em cache
 * enquanto isso (mesmo com muitas páginas, isso só roda 1x a cada 15 dias).
 */
export async function getTopInstagramPosts(limit = 5): Promise<InstagramPost[]> {
  const userId = process.env.INSTAGRAM_USER_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !accessToken) {
    return [];
  }

  let media: GraphMediaItem[];

  try {
    media = await fetchAllMedia(userId, accessToken);
  } catch (error) {
    console.error("[instagram] falha ao buscar posts:", error);
    return [];
  }

  const posts = media
    .filter((item) => item.media_url || item.thumbnail_url)
    .map((item) => ({
      id: item.id,
      caption: item.caption ?? "",
      permalink: item.permalink,
      imageUrl: (item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url) ?? item.thumbnail_url ?? "",
      engagement: (item.like_count ?? 0) + (item.comments_count ?? 0),
    }))
    .filter((post) => post.imageUrl);

  posts.sort((a, b) => b.engagement - a.engagement);

  return posts.slice(0, limit);
}
