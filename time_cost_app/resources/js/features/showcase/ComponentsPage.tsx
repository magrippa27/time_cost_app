import { Button, Card, CardHeader, CardContent, Input } from "../../shared/components/ui";

export function ComponentsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">
        UI components
      </h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Button
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Card
        </h2>
        <Card>
          <CardHeader>Card title</CardHeader>
          <CardContent>
            Card body. Use Card, CardHeader, and CardContent for consistent
            layout.
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Input
        </h2>
        <div className="max-w-xs space-y-4">
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
        </div>
      </section>
    </div>
  );
}
