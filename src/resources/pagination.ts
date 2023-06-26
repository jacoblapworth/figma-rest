import { PaginateData } from 'got'
import { FigmaPagination, PaginatedResponse } from '../models/response.js'

// type FigmaPaginate<T, R extends FigmaPagination> = PaginationOptions<
//   T,
//   R
// >['paginate']

// export const paginate: FigmaPaginate<T, R> = <T, R>({ response }) => {
//   const { next_page } = response.body.pagination || {}
//   if (next_page) {
//     return { searchParams: { next_page } }
//   }

//   return false
// }

export function paginate<T, R extends FigmaPagination = PaginatedResponse<T>>({
  response,
}: PaginateData<R, T>) {
  // const current = new URLSearchParams()
  // response.request.options.searchParams
  const { next_page } = response.body.pagination || {}

  if (next_page) {
    return { searchParams: { next_page } }
  }

  return false
}
