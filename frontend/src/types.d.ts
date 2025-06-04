import authClient from './services/auth-client';

declare global {
  type Session = typeof authClient.$Infer.Session;

  type OutletData = {
    data: Session | null;
    isPending: boolean;
  };

  type ProtectedOutletData = OutletData & {
    protectedData: null | object;
  };

  type NavbarProps = {
    user: Session['user'] | undefined;
    isPending: boolean;
  };
}
