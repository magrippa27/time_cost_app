import { Head } from '@inertiajs/react';
import AboutPage from '@/features/about/AboutPage';
import { ShowcaseLayout } from '@/shared/layouts/ShowcaseLayout';

export default function AboutInertiaPage() {
    return (
        <ShowcaseLayout>
            <Head title="About" />
            <AboutPage />
        </ShowcaseLayout>
    );
}

