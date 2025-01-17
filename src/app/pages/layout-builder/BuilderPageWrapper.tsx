import  {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
// @ts-ignore
import {BuilderPage} from "./BuilderPage"

const BuilderPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Layout Builder</PageTitle>
      <BuilderPage />
    </>
  )
}

export default BuilderPageWrapper
