import Head from "next/head"
import { useRouter } from "next/router"
import { CreateCase } from "~/components/cases/CreateCase"
import { CaseList } from "~/components/cases/CaseList"
import { Toaster } from "~/components/ui/toaster"
import { toast } from "~/components/ui/use-toast"

import { api } from "~/utils/api"

const getCases = () => {
  return api.case.list.useQuery()
}

const useCreateCase = () => {
  const router = useRouter()
  return api.case.create.useMutation({
    onSuccess() {
      router.reload()
      toast({
        title: "Case created",
        description: "Your case has been created successfully.",
      })
    },
  })
}

const usePayCase = () => {
  const router = useRouter()
  return api.case.pay.useMutation({
    onSuccess() {
      router.reload()
      toast({
        title: "Case paid",
        description: "Your case has been paid.",
      })
    },
  })
}

export default function Home() {
  const create = useCreateCase()
  const pay = usePayCase()
  const cases = getCases()

  return (
    <>
      <Head>
        <title>Lawhive Tech Task Sandbox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <CreateCase
              onCreate={(legalCase) =>
                create.mutate({
                  title: legalCase.title,
                  description: legalCase.description,
                  paymentType: legalCase.paymentType,
                  data: JSON.stringify({ percentage: legalCase.percentage }),
                })
              }
            />
          </div>
        </div>
        <div className="mx-auto flex w-full items-center justify-center bg-muted">
          <div className="w-[350px] gap-6">
            {cases.data && (
              <CaseList
                cases={cases.data}
                onClick={(id, paid, fee) =>
                  pay.mutate({
                    id: Number(id),
                    paidAmount: paid,
                    feeAmount: fee,
                  })
                }
              />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
