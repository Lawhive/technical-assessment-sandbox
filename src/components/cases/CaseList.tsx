/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

import type { LegalCase } from "@prisma/client"
import { Button } from "~/components/ui/button"
import { useState } from "react"
import { Input } from "../ui/input"

export const CaseList = ({
  cases,
  onClick,
}: {
  cases: LegalCase[]
  onClick: (id: string, payAmount: number, feeAmount: number) => void
}) => {
  return (
    <div className="flex flex-col gap-4 ">
      <CardTitle>Cases</CardTitle>
      <CardDescription>All cases posted.</CardDescription>

      {cases.map((legalCase) => (
        <CaseCard key={legalCase.id} legalCase={legalCase} onClick={onClick} />
      ))}
    </div>
  )
}

const CaseCard = ({
  legalCase,
  onClick,
}: {
  legalCase: LegalCase
  onClick: (id: string, payAmount: number, feeAmount: number) => void
}) => {
  const data = JSON.parse(legalCase.data)
  const [amount, setAmount] = useState("0")

  const pay = () => {
    const payAmount = Number(amount)

    const feeAmount =
      legalCase.paymentType === "fixed-fee"
        ? payAmount * (20 / 100)
        : payAmount * (data.percentage / 100) * (40 / 100)

    onClick(String(legalCase.id), payAmount, feeAmount)
  }
  return (
    <Card key={legalCase.id}>
      <CardHeader>
        <CardTitle>{legalCase.title}</CardTitle>
        <CardDescription>{legalCase.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        {legalCase.paymentType}

        {legalCase.paymentType === "no-win-no-fee" ? (
          <p>Compensation percentage: {data.percentage}%</p>
        ) : null}

        {legalCase.paymentType === "no-win-no-fee" ? (
          <p>Platform fee: 40%</p>
        ) : (
          <p>Platform fee: 20%</p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <p>{legalCase.isPaid ? "Paid" : "Not Paid"}</p>
        <p>{legalCase.feeAmount && `Fee: ${legalCase.feeAmount}`}</p>
        <p>{legalCase.paidAmount && `Paid: ${legalCase.paidAmount}`}</p>
        {legalCase.isPaid ? null : (
          <div className="flex items-center gap-2">
            £
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
            <Button onClick={() => pay()}>
              {legalCase.paymentType === "no-win-no-fee"
                ? "Register compensation"
                : "Register payment"}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
