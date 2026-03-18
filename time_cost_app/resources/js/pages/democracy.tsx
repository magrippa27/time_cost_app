import { Head } from '@inertiajs/react';
import HowToFixDemocracyPage from '@/features/democracy/HowToFixDemocracyPage';
import { ShowcaseLayout } from '@/shared/layouts/ShowcaseLayout';

export default function DemocracyInertiaPage() {
    return (
        <ShowcaseLayout>
            <Head title="How to fix Democracy?" />
            <HowToFixDemocracyPage />
        </ShowcaseLayout>
    );
}

