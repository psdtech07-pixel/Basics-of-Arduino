import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import Quiz from '../components/Quiz';

export default function QuizSection() {
  return (
    <section id="quiz" className="relative bg-navy-950/30">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            step="Section 12"
            title="Knowledge Check"
            subtitle="Test your understanding of everything covered in this masterclass. Select an answer for each question, then submit to see your score and explanations."
          />
        </AnimatedSection>

        <AnimatedSection>
          <Quiz />
        </AnimatedSection>
      </div>
    </section>
  );
}
