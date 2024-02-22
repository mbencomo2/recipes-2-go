import EditPassword from '@/app/ui/dashboard/account/editPassword';
import EditEmail from '@/app/ui/dashboard/account/editEmail';
import EditName from '@/app/ui/dashboard/account/editUserName';
import { alegreyaSansSC, cormorantInfant } from '@/app/ui/fonts';
import { auth, getUser } from '@/auth';
import { User } from 'next-auth';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { deleteAccount } from '@/app/lib/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Make changes to your account.',
};

export default async function Page() {
  const user = (await auth().then((session) => session?.user)) as User;
  const dbUser = await getUser(user?.email || '');
  let userData: { id?: string; name?: string; email?: string } = {};
  if (dbUser?.email) {
    userData = dbUser;
  }
  return (
    <main className="divide-y-4 divide-peach_yellow">
      <h1 className={`${cormorantInfant.className} text-4xl font-bold`}>
        Account Settings
      </h1>
      <section className="mx-auto my-4 lg:w-1/2">
        <h2 className={`${alegreyaSansSC.className} mt-2 text-2xl font-bold`}>
          Change User Name
        </h2>
        <p>
          <span className={`${alegreyaSansSC.className} text-lg font-bold`}>
            User Name:{' '}
          </span>
          {userData?.name || ''}
        </p>
        <EditName userId={userData?.id || ''} />
      </section>
      <section className="mx-auto my-4 lg:w-1/2">
        <h2 className={`${alegreyaSansSC.className} mt-2 text-2xl font-bold`}>
          Change Email
        </h2>
        <p>
          <span className={`${alegreyaSansSC.className} text-lg font-bold`}>
            Email:{' '}
          </span>
          {userData?.email || ''}
        </p>
        <EditEmail userId={userData?.id || ''} />
        <p>*You will need to sign in after changing your email.</p>
      </section>
      <section className="mx-auto my-4 lg:w-1/2">
        <h2 className={`${alegreyaSansSC.className} mt-2 text-2xl font-bold`}>
          Change Password
        </h2>
        <EditPassword userId={userData?.id || ''} />
        <p>*You will need to sign in after changing your password.</p>
      </section>
      <section className="mx-auto my-4 lg:w-1/2">
        <h2 className={`${alegreyaSansSC.className} mt-2 text-2xl font-bold`}>
          Delete Account
        </h2>
        <p className="font-lg">
          If you delete your account your data is gone forever (a long time)!
        </p>
        <form
          action={async () => {
            'use server';
            await deleteAccount(userData?.id || '');
          }}
        >
          <button className="mx-auto my-4 flex w-full items-center justify-center gap-4 rounded-md bg-red-500 py-2 text-xl font-bold text-white drop-shadow-lg hover:bg-red-300">
            Delete Account
            <ExclamationTriangleIcon className="h-8 w-8" />
          </button>
        </form>
      </section>
    </main>
  );
}
