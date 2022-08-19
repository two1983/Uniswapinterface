import { Trans } from '@lingui/macro'
import { PageName } from 'components/AmplitudeAnalytics/constants'
import { Trace } from 'components/AmplitudeAnalytics/Trace'
import { MAX_WIDTH_MEDIA_BREAKPOINT, MEDIUM_MEDIA_BREAKPOINT } from 'components/Tokens/constants'
import { favoritesAtom, filterStringAtom } from 'components/Tokens/state'
import FavoriteButton from 'components/Tokens/TokenTable/FavoriteButton'
import NetworkFilter from 'components/Tokens/TokenTable/NetworkFilter'
import SearchBar from 'components/Tokens/TokenTable/SearchBar'
import TimeSelector from 'components/Tokens/TokenTable/TimeSelector'
import TokenTable from 'components/Tokens/TokenTable/TokenTable'
import useExplorePageQuery from 'hooks/useExplorePageQuery'
import { useAtomValue, useResetAtom } from 'jotai/utils'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

const ExploreContainer = styled.div`
  width: 100%;
  min-width: 320px;
  padding: 0px 12px;
`
const TokenTableContainer = styled.div`
  padding: 16px 0px;
`
export const TitleContainer = styled.div`
  margin-bottom: 16px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  ${({ theme }) => theme.headline}
`
const FiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  height: 40px;

  @media only screen and (max-width: ${MEDIUM_MEDIA_BREAKPOINT}) {
    order: 2;
  }
`
const SearchContainer = styled(FiltersContainer)`
  width: 100%;
  margin-left: 8px;

  @media only screen and (max-width: ${MEDIUM_MEDIA_BREAKPOINT}) {
    margin: 0px;
    order: 1;
  }
`
const FiltersWrapper = styled.div`
  display: flex;
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT};
  margin: 0 auto;

  @media only screen and (max-width: ${MEDIUM_MEDIA_BREAKPOINT}) {
    flex-direction: column;
    gap: 8px;
  }
`

const Tokens = () => {
  const favoriteTokens = useAtomValue<string[]>(favoritesAtom)
  const { data, error, loading } = useExplorePageQuery(favoriteTokens)
  const resetFilterString = useResetAtom(filterStringAtom)
  const location = useLocation()
  useEffect(() => {
    resetFilterString()
  }, [location, resetFilterString])

  return (
    <Trace page={PageName.TOKENS_PAGE} shouldLogImpression>
      <ExploreContainer>
        <TitleContainer>
          <Trans>Explore Tokens</Trans>
        </TitleContainer>
        <FiltersWrapper>
          <FiltersContainer>
            <NetworkFilter />
            <FavoriteButton />
            <TimeSelector />
          </FiltersContainer>
          <SearchContainer>
            <SearchBar />
          </SearchContainer>
        </FiltersWrapper>

        <TokenTableContainer>
          <TokenTable data={data} error={error} loading={loading} />
        </TokenTableContainer>
      </ExploreContainer>
    </Trace>
  )
}

export default Tokens
