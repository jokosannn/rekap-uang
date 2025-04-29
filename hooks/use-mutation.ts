import { useMutation, useQueryClient } from '@tanstack/react-query'

type IProps = {
  queryKey: string | string[]
  func: any
}

export const useMutationData = ({ func, queryKey }: IProps) => {
  const queryCLient: any = useQueryClient()

  return useMutation({
    mutationFn: func,
    onSuccess: () => {
      queryCLient.invalidateQueries(queryKey)
    },
    onError: (error: Error) => {
      console.log('Error: ', error)
    }
  })
}
