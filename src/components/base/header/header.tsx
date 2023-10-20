import React, {useState} from "react";
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Аналитика', href: '/daily' },
  { name: 'Скринер', href: '/screener' },
]

type HeaderType = {
  isTransparent: boolean;
};

export const Header: React.FC<HeaderType> = ({ isTransparent }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`absolute inset-x-0 top-0 z-50 ${isTransparent ? '': 'bg-primary'}`}>
      <nav className="flex items-center justify-end lg:justify-center p-6 lg:px-8">
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <MobileHeaderDialog setMobileMenuOpen={setMobileMenuOpen} />
      </Dialog>
    </header>
  );
}

type mobileHeaderDialogType = {
  setMobileMenuOpen: (param: boolean) => void;
};

const MobileHeaderDialog: React.FC<mobileHeaderDialogType> = ({ setMobileMenuOpen }) => {
  return (
    <>
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-end">
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </>
  )
};
