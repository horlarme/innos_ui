import {Dialog} from 'primereact/dialog';
import {useGetArticleCategoriesQuery} from "../../queries/articles/get-categories";
import {useGetArticleSourcesQuery} from "../../queries/articles/get-sources";
import {MultiSelect} from "primereact/multiselect";
import {useState} from "react";
import {Button} from "primereact/button";
import {useSessionQuery} from "../../queries";
import {useSavePreferenceMutation} from "../../mutations";

interface Props {
    onHide: (updated: boolean) => void
}

export default function PersonalizationModal(props: Props) {
    const {data: profile} = useSessionQuery()

    const [selectedCategories, _selectedCategories] = useState(profile?.preference?.categories?.map(a => a.id) ?? [])
    const [selectedSources, _selectedSources] = useState(profile?.preference?.sources?.map(a => a.id) ?? [])
    // const [selectedAuthors, _selectedAuthors]= useState([])

    const {data: categories} = useGetArticleCategoriesQuery()
    const {data: sources} = useGetArticleSourcesQuery()
    const {isPending, mutateAsync} = useSavePreferenceMutation()

    // const { data: authors } = useGetArticleAuthorsQuery()

    function save() {
        mutateAsync({sources: selectedSources, categories: selectedCategories})
            .then(() => props.onHide(true))
    }

    return (
        <Dialog header="Feed Personalization"
                visible={true}
                footer={<Button loading={isPending} label={'Save'} onClick={() => save()} type={'button'}/>}
                className={'w-full md:max-w-2xl'}
                onHide={() => props.onHide(false)}>
            <div className="space-y-3">
                <div className={'flex items-start'}>
                    <h2 className={'w-32'}>Categories:</h2>
                    <div className="w-full flex flex-wrap gap-2">
                        <MultiSelect
                            options={categories}
                            value={selectedCategories}
                            onChange={(e) => _selectedCategories(e.value)}
                            display={'chip'}
                            placeholder={'Choose preferred categories'}
                            className={'w-full'}
                            pt={{label: {className: 'flex-wrap! w-full flex! gap-2'}}}
                            optionLabel={'name'}
                            optionValue={'id'}
                        />
                    </div>
                </div>
                <div className={'flex items-start'}>
                    <h2 className={'w-32'}>Sources:</h2>
                    <div className="w-full flex flex-wrap gap-2">
                        <MultiSelect
                            options={sources}
                            placeholder={'Choose preferred sources'}
                            value={selectedSources}
                            onChange={(e) => _selectedSources(e.value)}
                            display={'chip'}
                            className={'w-full'}
                            pt={{label: {className: 'flex-wrap! w-full flex! gap-2'}}}
                            optionLabel={'name'}
                            optionValue={'id'}
                        />
                    </div>
                </div>
                {/*<div className={'flex items-start'}>*/}
                {/*    <h2 className={'w-32'}>Authors:</h2>*/}
                {/*    <div className="w-full flex flex-wrap gap-2">*/}
                {/*        <MultiSelect*/}
                {/*            options={authors}*/}
                {/*            placeholder={'Choose preferred authors'}*/}
                {/*            value={selectedAuthors}*/}
                {/*            onChange={(e) => _selectedAuthors(e.value)}*/}
                {/*            display={'chip'}*/}
                {/*            className={'w-full overflow-hidden'}*/}
                {/*            optionLabel={'author'}*/}
                {/*            optionValue={'author'}*/}
                {/*            pt={{*/}
                {/*                label: { className: 'flex-wrap! w-full flex! gap-2'},*/}
                {/*        }}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </Dialog>
    )
}
