import {
  AuthenticationError as AuthenticationErr,
  AuthorizationError as AuthorizationErr,
  NotFoundError as NotFoundErr,
} from "blitz"

export enum ErrorName {
  PaymentRequiredError = "PaymentRequiredError",
  ExceededPlanError = "ExceededPlanError",
  AuthenticationError = "AuthenticationError",
  AuthorizationError = "AuthorizationError",
  NotFoundError = "NotFoundError",
}

export class PaymentRequiredError extends Error {
  name = ErrorName.PaymentRequiredError
  statusCode = 402
  constructor(
    message = "Du må betale for dette innholdet. Vennligst kjøp en av våre planer for å fortsette."
  ) {
    super(message)
  }
  get _clearStack() {
    return true
  }
}

export class ExceededPlanError extends Error {
  name = ErrorName.ExceededPlanError
  statusCode = 402
  constructor(
    message = "Du har brukt opp det som ligger i din plan. Vennligst oppgrader for å fortsette."
  ) {
    super(message)
  }
  get _clearStack() {
    return true
  }
}

export class AuthenticationError extends AuthenticationErr {
  constructor(message = "Du må være innlogget for å få tilgang til dette innholdet") {
    super(message)
  }
}

export class AuthorizationError extends AuthorizationErr {
  constructor(message = "Du har ikke tilgang til dette innholdet") {
    super(message)
  }
}

export class NotFoundError extends NotFoundErr {
  constructor(message = "Vi kunne ikke finne innholdet") {
    super(message)
  }
}
