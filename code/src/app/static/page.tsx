import Section from '../components/section';
import { sections } from '../constants/staticContent';

export default function Static() {
    return (
        <div className="p-3">
            <h1 className='text-title my-4'>Static Page</h1>
            {sections.map((sec, idx) => (
        <Section
          key={idx}
          heading={sec.heading}
          text={sec.text}
          imageSrc={sec.imageSrc}
          imageAlt={sec.imageAlt}
          imageTitle={sec.imageTitle}
        />
      ))}
        </div>
    )
}