import React from "react";
import { Camera, MicOff } from "lucide-react";

interface ParticipantsListProps {
	participants: any[];
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({ participants }) => {
	return (
		<div className="flex flex-col flex-1 h-full">
			<div className="mb-2 text-sm text-gray-600 font-medium">
				{participants.length} participant{participants.length !== 1 ? "s" : ""}
			</div>
			<div className="flex-1 overflow-y-auto mb-4 pr-1">
				<ul className="space-y-3">
					{participants.map((p, i) => (
						<li
							key={i}
							className="flex items-center justify-between bg-white/70 glass-effect p-2 rounded shadow-sm hover:shadow-md transition-all duration-200"
						>
							<div className="flex items-center gap-2">
								{p.avatar || p.image ? (
									<img
										src={p.avatar || p.image}
										alt={p.name}
										className="w-8 h-8 rounded-full object-cover flex-shrink-0"
									/>
								) : (
									<div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
								)}
								<span className="text-sm sm:text-base truncate">
									{p.name}
								</span>
							</div>
							<div className="flex gap-2">
								<Camera className="w-4 h-4" />
								<MicOff className="w-4 h-4" />
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ParticipantsList;