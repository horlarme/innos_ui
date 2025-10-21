import {useGetArticlesQuery} from "../queries";
import {useSearchParams} from "react-router";
import {Article} from "../components";
import {useGetArticleCategoriesQuery} from "../queries/articles/get-categories";
import {useGetArticleSourcesQuery} from "../queries/articles/get-sources";
import {MultiSelect} from "primereact/multiselect";
import {InputText} from "primereact/inputtext";
import {Paginator, type PaginatorPageChangeEvent} from "primereact/paginator";
import {useGetArticleAuthorsQuery} from "../queries/articles/get-authors";

export default function Home() {
    const [searchParams, _searchParams] = useSearchParams()

    const page = parseInt(searchParams.get('page') ?? '1')
    const selectedCategories = searchParams.get('categories')?.split(',')?.filter(Boolean)?.map(Number) ?? []
    const selectedSource = searchParams.get('sources')?.split(',')?.filter(Boolean)?.map(Number) ?? []
    const selectedAuthors = searchParams.get('authors')?.split(',')?.filter(Boolean) ?? []
    const searchQuery = searchParams.get('q')?.toString() ?? ''

    const {isPending, data} = useGetArticlesQuery({
        page,
        categories: selectedCategories,
        query: searchQuery,
        sources: selectedSource,
        authors: selectedAuthors,
    })
    const {data: categories} = useGetArticleCategoriesQuery()
    const {data: sources} = useGetArticleSourcesQuery()
    const { data: authors } = useGetArticleAuthorsQuery()

    function handleSearchChange(event: string) {
        _searchParams((r) => {
            r.set('page', '1')
            r.set('q', event)

            return r
        })
    }

    function handleCategoryChange(event: Array<string>) {
        _searchParams((r) => {
            r.set('page', '1')
            r.set('categories', event.join(','))

            return r
        })
    }
    function handleAuthorChange(event: Array<string>) {
        _searchParams((r) => {
            r.set('page', '1')
            r.set('author', event.join(','))

            return r
        })
    }

    function handleSourceChange(event: Array<string>) {
        _searchParams((r) => {
            r.set('page', '1')
            r.set('sources', event.join(','))

            return r
        })
    }

    function handlePageChange(event: PaginatorPageChangeEvent) {
        console.log(event)
        _searchParams((r) => {
            r.set('page', (event.page + 1).toString())

            return r
        })
    }

    return <>
        <title>Home</title>

        <main className="container mx-auto p-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-4">
                <InputText
                    defaultValue={searchQuery}
                    onInput={(a) => handleSearchChange(a.currentTarget.value)}
                    placeholder={'Search article...'}/>
                <MultiSelect onChange={(a) => handleAuthorChange(a.value)}
                             value={selectedCategories}
                             className={'w-full'}
                             placeholder={'Filter By Authors'}
                             optionLabel={'author'}
                             optionValue={'author'}
                             display={'chip'}
                             options={authors ?? []}/>
                <MultiSelect onChange={(a) => handleCategoryChange(a.value)}
                             value={selectedCategories}
                             optionLabel={'name'}
                             optionValue={'id'}
                             className={'w-full'}
                             placeholder={'Filter By Categories'}
                             display={'chip'}
                             options={categories ?? []}/>
                <MultiSelect onChange={(a) => handleSourceChange(a.value)}
                             placeholder={'Filter By Sources'}
                             value={selectedSource}
                             optionValue={'id'}
                             display={'chip'}
                             optionLabel={'name'}
                             className={'md:col-span-3'}
                             options={sources}/>
            </div>

            {isPending
                ? <span className="loading loading-spinner"/> :
                data ?
                    <>
                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                            {data?.data?.map(article => <Article key={`Article-${article.id}`} article={article}/>)}
                        </div>

                        <Paginator
                            first={data.meta.from}
                            rows={data.meta.per_page}
                            totalRecords={data.meta.total}
                            onPageChange={handlePageChange}/>
                    </>
                    : null}
        </main>
    </>
}
