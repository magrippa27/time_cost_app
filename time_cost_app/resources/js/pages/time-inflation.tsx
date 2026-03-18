import { Head } from '@inertiajs/react';
import TimeInflationPage from '@/features/time-inflation/TimeInflationPage';
import { ShowcaseLayout } from '@/shared/layouts/ShowcaseLayout';

export default function TimeInflationInertiaPage() {
    return (
        <ShowcaseLayout>
            <Head title="Time-Inflation" />
            <TimeInflationPage />
        </ShowcaseLayout>
    );
}

