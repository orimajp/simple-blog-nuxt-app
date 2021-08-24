export interface ArticleResponse {
  id: number
  title: string
  body: string
}

export interface ArticleListResponse {
  articles: Array<ArticleResponse>
}
