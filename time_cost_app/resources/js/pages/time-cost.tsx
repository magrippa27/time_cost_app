import { Head } from '@inertiajs/react';
import TimeCost1Page from '@/features/time-cost/TimeCost1Page';
import { ShowcaseLayout } from '@/shared/layouts/ShowcaseLayout';

export default function TimeCostPage() {
    return (
        <ShowcaseLayout>
            <Head title="Time-Cost" />
            <TimeCost1Page />
        </ShowcaseLayout>
    );
}

