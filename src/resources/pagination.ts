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

export async function paginateAll<T>(paginateEach: AsyncIterableIterator<T>) {
  let items: T[] = []

  for await (let item of paginateEach) {
    items.push(item)
  }

  return items
}

// export type FigmaClientPaginate = {
//   <T, R = unknown>(
//     url: string | URL,
//     options?: FigmaPagination<T, R>
//   ): AsyncIterableIterator<T>

//   all: <T, R = unknown>(
//     url: string | URL,
//     options?: OptionsWithPagination<T, R>
//   ) => Promise<T[]>
// }
