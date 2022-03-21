import { User } from "./../user/user";
export interface Application {
  id: string;
  name: string;
  icon?: string;
  description: string;
  rpc_origions?: string;
  bot_public: boolean;
  bot_require_code_grant: boolean;
  terms_of_serivce_url?: boolean;
  privacy_policy_url?: boolean;
  owner?: User
}