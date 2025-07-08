import { classNames } from '@/lib/utils';

interface DemoSectionProps {
  className?: string;
}

export function DemoSection({ className }: DemoSectionProps) {
  return (
    <section className={classNames('bg-white py-20', className)} id="demo">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">See it in action</h2>
        <p className="mx-auto text-xl text-gray-600">
          Watch how easy it is to build custom pages with our drag-and-drop interface.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl rounded-lg border border-gray-300 p-2 shadow-lg">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              borderRadius: '0',
              boxShadow: '0 15px 40px rgba(63,58,79,.3)',
              overflow: 'hidden',
              minWidth: '320px',
            }}
          >
            <iframe
              src="https://dndbuilder.portal.trainn.co/share/QL6h2jqmyZRG8q0MAlxtNA/embed?autoplay=false"
              allowFullScreen
              allow="autoplay; fullscreen"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
