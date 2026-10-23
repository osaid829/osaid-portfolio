import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Approach } from '@/components/sections/Approach';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
export const revalidate = 3600;
export default function Page() {
    return <>
        <Header />
        <main id="main" className="site-main">
            <Hero />
            <About />
            <Skills />
            <Approach />
            <Projects />
            <Contact />
        </main>
    </>;
}
