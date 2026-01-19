"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useCharacter } from "@/context/CharacterContext";

interface PersonalityFormatStepProps {
    characterIndex: number;
    onNext: () => void;
    onBack: () => void;
}

const BOILERPLATES = {
    Basic: `Name:
Appearance:
Role:
Personality:
Relationships:
History:
Goals:
Notes:
Speech:
Dialogue Example:`,

    Advanced: `Full Name
Aliases:
Species:
Nationality:
Ethnicity:
Age:
Hair:
Eyes:
Body:
Face:
Features:
Scent:
Clothing:

Backstory:
- bullet points allowed

Relationships:
- {{user}} - description + in-character opinion
-
-

Goal:

Personality Archetype:
Traits:
Opinions:

Sexual Behavior:
- description
- kinks
- quirks

Dialogue:
(These are merely examples of how {{char}} may speak and should NOT be used verbatim.)
Greeting Example:
Angry:
Happy:
A memory:
A strong opinion:
Dirty talk:

Notes:
-
-
-
-`,

    Optimized: `<npcs>
(brief 50-100 word description of any mentioned NPC or side characters, formatted as so:
(Name, hair color, eye color, physical traits, personality traits, occupation/role)
</npcs>

<character_name>
Full Name:
Aliases: nicknames, callsigns, false names etc
Species: (optional, only when relevant)
Nationality: (optional, only when relevant)
Ethnicity: (optional, only when relevant)
Age:
Occupation/Role: (optional, only when relevan)
Appearance:
Scent:
Clothing: (Brief description of any uniforms, personal style, preferred fashion etc.)

[Backstory:
(General description of backstory, succinct but comprehensive. Bullet points may be used to emphasize key memories.)]
Current Residence: (Location name + brief description)

[Relationships:
(Any significant relationships, family, friends, coworkers etc., and a speech example showing how the character feels about that person.)

e.g user - relationship description. "In-character dialogue showing opinion about user here."
-
-
]
[Personality
Traits:
Likes:
Dislikes:
Insecurities:
Physical behavour: quirks, habits
Opinion: Strongly held beliefs, opinions or philosophies, e.g religious beliefs, political beliefs and so on.]

[Intimacy
Turn-ons: (any kinks or fetishes, with brief description of what they enjoy about that kink/fetish)
During Sex:]

[Dialogue
(Any accents, tone, verbal habits or quirks.)
[These are merely examples of how CHARACTER NAME may speak and should NOT be used verbatim.] (<-- keep this in the profile)
Greeting Example: "(Example here)"
Surprised: "(Example here)"
Stressed: "(Example here)"
Memory: "(Example here)"
Opinion: "(Example here)"]

[Notes

Any key aspects to emhasize, like unique physical traits or differences
Anything that doesn’t fit elswhere ie fun facts, allergies, secrets, etc.
-
-
-
]
</character_name>`
};

export default function PersonalityFormatStep({ characterIndex, onNext, onBack }: PersonalityFormatStepProps) {
    const { characters, updateCharacter } = useCharacter();
    const character = characters[characterIndex];

    // Default to Basic if not set (though initialCharacter sets it to Basic)
    const selectedFormat = character.personalityFormat || "Basic";

    const handleSelect = (format: "Basic" | "Advanced" | "Optimized") => {
        updateCharacter(characterIndex, { personalityFormat: format });
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl font-bold text-foreground">Choose Personality Format</h2>
            </div>
            <p className="text-muted-foreground mb-8">
                Select the structural template for your character&apos;s personality profile. The AI will strictly follow this structure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {(Object.keys(BOILERPLATES) as Array<"Basic" | "Advanced" | "Optimized">).map((format) => (
                    <motion.div
                        key={format}
                        onClick={() => handleSelect(format)}
                        className={`cursor-pointer rounded-2xl border-2 transition-all overflow-hidden relative ${selectedFormat === format
                            ? "border-violet-500 bg-violet-500/5 shadow-lg shadow-violet-500/10"
                            : "border-border hover:border-violet-500/50 bg-card/30"
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Header */}
                        <div className={`p-4 border-b ${selectedFormat === format ? "border-violet-500/20 bg-violet-500/10" : "border-border/50"}`}>
                            <div className="flex items-center justify-between">
                                <h3 className={`font-bold text-lg ${selectedFormat === format ? "text-violet-400" : "text-foreground"}`}>
                                    {format}
                                </h3>
                                {selectedFormat === format && (
                                    <CheckCircle2 className="w-5 h-5 text-violet-500" />
                                )}
                            </div>
                        </div>

                        {/* Terminal Preview */}
                        <div className="p-4 bg-zinc-950 h-[400px] overflow-y-auto custom-scrollbar relative font-mono text-xs leading-relaxed">
                            <div className="absolute top-0 left-0 w-full h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-2 gap-1.5 z-10">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                <span className="ml-2 text-zinc-500">template.txt</span>
                            </div>
                            <div className="pt-8 text-zinc-300 whitespace-pre-wrap">
                                {BOILERPLATES[format]}
                            </div>
                        </div>

                        {/* Selection Overlay */}
                        {selectedFormat !== format && (
                            <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors pointer-events-none" />
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex-1 py-4 rounded-2xl glass border border-border hover:bg-white/5 transition-colors text-center font-medium"
                >
                    <ArrowLeft className="w-5 h-5 inline mr-2" />
                    Back
                </button>
                <motion.button
                    onClick={onNext}
                    className="flex-[2] py-4 rounded-2xl bg-violet-500 hover:bg-violet-600 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Continue with {selectedFormat} Format
                    <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
}
