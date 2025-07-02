
export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">API Reference</h1>

          <p className="mb-8 text-xl text-gray-600">
            Comprehensive documentation of the DnD Builder API.
          </p>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Core Components</h2>

            <div className="mb-8 border-b border-gray-200 pb-8">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Builder</h3>
              <p className="mb-4 text-gray-600">
                The main component that renders the builder interface.
              </p>

              <div className="mb-4">
                <h4 className="mb-2 font-medium text-gray-900">Props</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Required</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium">components</td>
                        <td className="px-4 py-3"><code>Record&lt;string, Component&gt;</code></td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Map of component types to their implementations</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium">value</td>
                        <td className="px-4 py-3"><code>BuilderState</code></td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Current state of the builder</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium">onChange</td>
                        <td className="px-4 py-3"><code>(state: BuilderState) => void</code></td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Callback when state changes</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium">readOnly</td>
                        <td className="px-4 py-3"><code>boolean</code></td>
                        <td className="px-4 py-3">No</td>
                        <td className="px-4 py-3">If true, builder is in read-only mode</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium text-gray-900">Example</h4>
                <div className="rounded-md bg-gray-900 p-4">
                  <pre className="text-sm text-white">
{`<Builder
  components={components}
  value={state}
  onChange={setState}
  readOnly={false}
/>`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-8">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">useBuilderState</h3>
              <p className="mb-4 text-gray-600">
                Hook for managing builder state with undo/redo support.
              </p>

              <div className="mb-4">
                <h4 className="mb-2 font-medium text-gray-900">Parameters</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Required</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3 font-medium">initialState</td>
                        <td className="px-4 py-3"><code>BuilderState</code></td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3">Initial state of the builder</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium text-gray-900">Returns</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                      <tr>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-3">
                          <code>
                            [BuilderState, (state: BuilderState) => void, {"{"}
                            undo: () => void, 
                            redo: () => void, 
                            canUndo: boolean, 
                            canRedo: boolean 
                            {"}"}]
                          </code>
                        </td>
                        <td className="px-4 py-3">State, setState function, and undo/redo controls</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Types</h2>

            <div className="mb-8 border-b border-gray-200 pb-8">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">BuilderState</h3>
              <p className="mb-4 text-gray-600">
                Represents the current state of the builder.
              </p>

              <div className="rounded-md bg-gray-900 p-4">
                <pre className="text-sm text-white">
{`interface BuilderState {
  blocks: Record<string, Block>;
  root: {
    id: string;
    children: string[];
  };
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Block</h3>
              <p className="mb-4 text-gray-600">
                Represents a single block in the builder.
              </p>

              <div className="rounded-md bg-gray-900 p-4">
                <pre className="text-sm text-white">
{`interface Block {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: string[];
}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <a 
              href="/docs" 
              className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              View Documentation
            </a>
            <a 
              href="/examples" 
              className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              See Examples
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
