# Lawhive Technical Assessment Sandbox

This project is built using the T3 stack, which includes Next.js, TypeScript, Tailwind CSS, tRPC, and Prisma.

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up your environment variables in `.env` by copying the `.env.example` file and filling in the missing values
4. Setup the database: `pnpm run db:push`
5. Run the development server: `pnpm run dev`
6. Open [http://localhost:3000](http://localhost:3000) in your browser
7. Open [http://localhost:5555](http://localhost:5555) in your browser to view the Prisma database studio

## Important files in the project structure

```bash
root/
├── prisma/
│ ├── schema.prisma          # Database schema
├── src/
│ ├── components/
│ │ ├── cases/
│ │ │ ├── CreateCase.tsx      # Form component to create a Case
│ │ │ ├── CaseList.tsx        # Component to list all Cases
│ │ ├── ui/                  # Shared UI components with Shadcn
│ ├── pages/
│ │ ├── index.tsx            # The main page of the application
│ ├── server/
│ │ ├── api/
│ │ │ ├── cases/
│ │ │ │ ├── case.ts           # Backend procedures for creating a Case
│ │ │ │ ├── task.ts          # Backend procedures for managing long-running tasks
│ │ ├── inngest/
│ │ │ ├── client.ts          # Familiarity is not required - mocks a long-running background task
├── .env.example             # Initial environment variables
├── package.json
├── README.md
```

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [tRPC](https://trpc.io/) - Typesafe backend for NextJS
- [Tanstack Query](https://tanstack.com/query) - Data fetching (within tRPC wrapper)
- [Zod](https://zod.dev/) - Validation
- [Shadcn UI](https://ui.shadcn.com/) - Used for basic components
- [Prisma](https://www.prisma.io/) - Using SQLite for the database
- [Inngest](https://www.inngest.com/) - This is used to mock a long-running background job, **familiarity is not required for the challenge**

## Running the app

You'll be able to run the app and interact with the database using the following commands:

```bash
# Development
npm dev # Start the development server, with the app on port 3000 and the database studio on 5555

# Managing the database
npm db:push # Push the database schema to the database
```

For more information on the T3 stack, visit [create.t3.gg](https://create.t3.gg/).

# The Application

You’ve been given an an application for a Legal Case Platform that allows a lawyer to create and manage their `Cases` with their clients.

The application is a sandbox with basic features implemented, it can be changed and critiqued as necessary.

(You don't need to worry about authentication or permissions. You can assume there will only be a single user of the application.)

## The Domain

A `Case` describes a piece of legal work a lawyer is helping their client with.

A `Case` has a `Payment Type` which describes how the lawyer will be paid for their work.

There are two types of `Payment Type`:

- Fixed Fee: A fixed amount is paid for the case
- No Win No Fee: A percentage of future compensation is paid for the case (if successful), e.g. "20% of any compensation"

Lawyers can create `Cases` on the platform, and they specify the `Payment Type` for each `Case`.

Lawyers will collect payment from clients, and mark their `Case` as `Paid`.

When a case is `paid`, lawyers will also pay a `fee` to the platform for facilitating the case.

Depending on the `Payment Type` of a Case, the fee paid to the platform changes:

- Fixed Fee Cases are charged a 20% fee of the payment amount
- No Win No Fee Cases are charged a 40% fee of the payment amount

A `Case` has a `Title`, `Description`, `Status`, a `Payment Type` and payment information depending on the `Payment Type`.
