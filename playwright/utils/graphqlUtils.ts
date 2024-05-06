import type { APIRequestContext, APIResponse, Page } from "@playwright/test";
import graphqlPayload from "../constants/graphqlPayloads.json";
import { BankAccount } from "../constants/types";
import { getCookieHeaders } from "./cookieUtils";

async function callGraphql(
  context: APIRequestContext,
  apiURL: string,
  request = { operationName: "", query: "", variables: {} }
): Promise<APIResponse> {
  return context.post(`${apiURL}/graphql`, {
    data: request,
    headers: await getCookieHeaders(context),
  });
}

export async function createBankAccountByGraphQl(
  context: APIRequestContext,
  apiURL: string,
  bankAccount: BankAccount
): Promise<BankAccount> {
  const response = await callGraphql(context, apiURL, {
    ...graphqlPayload.CreateBankAccount,
    variables: {
      userId: bankAccount.userId,
      bankName: bankAccount.bankName,
      accountNumber: bankAccount.accountNumber,
      routingNumber: bankAccount.routingNumber,
    },
  });
  return (await response.json()).data.createBankAccount;
}