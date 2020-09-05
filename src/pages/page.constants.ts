export interface IPage {
  TITLE: string,
  NAME: string,
  ROUTE: string
}

export interface IPages {
  [index: string]: IPage
}

export const PAGES: IPages = {
  WORKOUT: {
    TITLE: "Work Out",
    NAME: "workout",
    ROUTE: "/page/workout"
  },
  DECKS: {
    TITLE: "Decks",
    NAME: "decks",
    ROUTE: "/page/decks"
  },
  ItemS: {
    TITLE: "Items",
    NAME: "Items",
    ROUTE: "/page/Items"
  },
  SETTINGS: {
    TITLE: "Settings",
    NAME: "settings",
    ROUTE: "/page/settings"
  },
  SLIDES: {
    TITLE: "Slides",
    NAME: "slides",
    ROUTE: "/slides"
  },
  SIGNUP: {
    TITLE: "Sign Up",
    NAME: "signup",
    ROUTE: "/signup"
  },
  LOGIN: {
    TITLE: "Login",
    NAME: "login",
    ROUTE: "/login"
  }
}
