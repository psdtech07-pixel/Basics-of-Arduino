import { Zap } from 'lucide-react';

export default function SimulationBadge() {
  return (
    <span className="sim-badge" aria-label="This is a simulation, not real hardware">
      <Zap size={10} className="fill-current" />
      Simulation
    </span>
  );
}
