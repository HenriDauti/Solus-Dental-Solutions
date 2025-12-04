import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  details: string;
  benefits: string[];
  duration: string;
  image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  details,
  benefits,
  duration,
  image,
}) => {
  return (
    <div className="group relative card-glass card-premium card-shine card-hover animate-fade-in-up">
      {/* Gradient Glow on Hover */}
      <div className="absolute -inset-0.5 gradient-blue-purple rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
      
      <div className="relative p-8 space-y-6">
        {/* Service Header */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Details */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-foreground leading-relaxed">
            {details}
          </p>
        </div>

        {/* Benefits List */}
        {benefits.length > 0 && (
          <ul className="space-y-2 pt-4">
            {benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Duration Badge */}
        <div className="pt-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-muted-foreground">
            {duration}
          </span>
        </div>
      </div>

      {/* Corner Decoration */}
      <div className="absolute top-4 right-4 w-20 h-20 gradient-accent rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
    </div>
  );
};

export default ServiceCard;