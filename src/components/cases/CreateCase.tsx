import { Prisma } from "@prisma/client"
import * as React from "react"

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

type CaseForm = {
  title: string
  description: string
  paymentType: string
  percentage?: number
}

export const CreateCase = ({
  onCreate,
}: {
  onCreate: (caseForm: CaseForm) => void
}) => {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [paymentType, setPaymentType] = React.useState("fixed-fee")
  const [percentage, setPercentage] = React.useState("20")

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Case</CardTitle>
        <CardDescription>Post a new legal case</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input
                id="title"
                placeholder="Title of the case"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description for the case"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger id="payment-type">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="fixed-fee">Fixed fee</SelectItem>
                  <SelectItem value="no-win-no-fee">No win no fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {paymentType === "no-win-no-fee" && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="percentage">Compensation percentage fee</Label>
              <Input
                id="percentage"
                placeholder="Fee percentage"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={() =>
            onCreate({
              title,
              description,
              paymentType,
              percentage: Number(percentage),
            })
          }
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  )
}
