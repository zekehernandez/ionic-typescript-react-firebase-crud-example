import { IPage, PAGES } from "./page.constants"

export const getPageForName = (name: string): IPage => {
  for (const pageProperty in PAGES) {
    const page: IPage = PAGES[pageProperty]

    if (page.NAME === name) {
      return page
    }
  }

  return { TITLE: '', NAME: '', ROUTE: ''}
}
