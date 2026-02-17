export default function WelcomePage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="bg-white border-b border-line px-4 py-5 md:px-8 flex justify-between items-center">
        <div>
          <div className="font-display text-green text-lg tracking-wide">Feroleto Garden Co.</div>
          <div className="text-[10px] font-medium tracking-widest uppercase text-brown">What We Grow</div>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl md:text-4xl text-dark mb-2">Welcome</h1>
          <p className="text-brown mb-8">
            Enter your name to browse the catalog and choose what you&apos;d like in your garden this season.
          </p>
          <form action="/api/set-name" method="POST" className="space-y-4">
            <label htmlFor="name" className="block text-sm font-medium text-dark">
              Your name
            </label>
            <input
              id="name"
              name="clientName"
              type="text"
              placeholder="e.g. Jane"
              className="w-full px-4 py-3 border border-line rounded-sm bg-white text-dark placeholder-sand focus:outline-none focus:ring-2 focus:ring-green/30 focus:border-green"
              required
            />
            <button
              type="submit"
              className="w-full bg-green text-white font-medium py-3 rounded-sm hover:bg-green-mid transition-colors"
            >
              Continue to catalog
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
