import { Head } from '@inertiajs/react';
import HowToFixDemocracyPage from '@/features/democracy/HowToFixDemocracyPage';
import type { DemocracyPostProps } from '@/features/democracy/types';
import { ShowcaseLayout } from '@/shared/layouts/ShowcaseLayout';

export default function DemocracyInertiaPage({
    posts,
}: {
    posts: DemocracyPostProps[];
}) {
    return (
        <ShowcaseLayout>
            <Head title="How to fix Democracy?" />
            <HowToFixDemocracyPage posts={posts} />
        </ShowcaseLayout>
    );
}
