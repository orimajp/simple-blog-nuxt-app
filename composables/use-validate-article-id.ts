export const useValidateArticleId = () => {
  const validateArticleId = (articleId: string): string | null => {
    if (!articleId){
      return '記事IDが指定されていません。'
    }
    /*
    const id = parseInt(articleId, 10)
    if (isNaN(id)) {
      return '記事IDが数字ではありません。'
    }
     */
    return null
  }

  return {
    validateArticleId
  }
}
