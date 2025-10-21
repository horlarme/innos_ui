import {useSearchParams} from "react-router";
import {useGetPersonalizedFeedQuery, useSessionQuery} from "../queries";
import {Article} from "../components";
import {Paginator} from "primereact/paginator";
import {useState} from "react";
import {Button} from "primereact/button";
import PersonalizationModal from "../components/modals/personalization";

export default function Feed() {
    const [searchParams, _searchParams] = useSearchParams()
    const {data: profile} = useSessionQuery()

    const [visible, _visible] = useState<boolean>(false);

    const page = parseInt(searchParams.get('page') ?? '1')

    const {isPending, data} = useGetPersonalizedFeedQuery({page})

    function onPersonalizationModalClose(updated: boolean) {
        if (updated) _searchParams({page: '1'})
        _visible(false)
    }

    return <main className={'container mx-auto p-4'}>
        <title>
            Personalized Feed
        </title>

        <div className="flex justify-between items-center mb-4">
            <h2 className={'text-lg font-bold'}>
                {profile!.name}'s Personalized Feed
            </h2>
            <Button label={'Personalize'} onClick={() => _visible(true)}/>
        </div>

        {visible ? <PersonalizationModal onHide={onPersonalizationModalClose}/> : null}

        {isPending
            ? <span className="loading loading-spinner"/> :
            (data && data.data.length) ?
                <>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {data?.data?.map(article => <Article key={article.id} article={article}/>)}
                    </div>

                    <Paginator
                        first={data.meta.from}
                        rows={data.meta.per_page}
                        totalRecords={data.meta.total}
                        onPageChange={(a) => _searchParams({page: (a.page + 1).toString()})}
                    />
                </>
                : <p className={'text-center py-24'}>Personalize your feed to see articles.</p>}
    </main>
}
