
import {Input} from "../../components";
import {Label} from "../../components";
import {Textarea} from "../../components";
import { useFormContext } from "../../contexts/NewListingFormContext.jsx";

export default function Step4Tips() {
    const { form, errors, updateTips } = useFormContext();

    return (
        <section>
            <header className="text-center">
                <h2 className="text-xl font-semibold text-slate-800">Helpful Tips</h2>
                <p className="text-sm text-slate-500">Share what visitors should know before they go.</p>
            </header>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-3">

                    {/* Best Season */}
                    <div>
                        <Label htmlFor="season">Best season</Label>
                        <Input
                            id="season"
                            value={form.tips.bestSeason}
                            onChange={(e) => updateTips({ bestSeason: e.target.value })}
                        />
                    </div>

                    {/* Difficulty Select */}
                    <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <select
                            id="difficulty"
                            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                            value={form.tips.difficulty}
                            onChange={(e) => updateTips({ difficulty: e.target.value })}
                        >
                            <option value="">Select difficulty</option>
                            <option>Easy</option>
                            <option>Moderate</option>
                            <option>Challenging</option>
                        </select>
                        {errors.difficulty && <p className="mt-1 text-xs text-rose-600">{errors.difficulty}</p>}
                    </div>
                    {/* Permits Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            id="permits"
                            type="checkbox"
                            aria-describedby="permits-description"
                            value={form.tips.permitsRequired}
                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-200"
                            checked={form.tips.permitsRequired}
                            onChange={(e) => updateTips({ permitsRequired: e.target.checked })}
                        />
                        <Label htmlFor="permits">Permits required</Label>
                    </div>

                    {form.tips.permitsRequired &&(
                        <div>
                            <p className="text-sm text-slate-600">How to get the permits?</p>
                            <Textarea
                                rows={4}
                                value={form.tips.permitsDescription || ""}
                                onChange={(e) => updateTips({ permitsDescription: e.target.value })}
                            />
                        </div>
                        )}
                </div>
                {/* Extra Advice */}
                <div>
                    <Label htmlFor="extra">Extra advice</Label>
                    <Textarea
                        id="extra"
                        rows={6}
                        value={form.tips.extraAdvice}
                        onChange={(e) => updateTips({ extraAdvice: e.target.value })}
                        placeholder="What to pack, safety notes, local etiquette, etc."
                    />
                </div>
            </div>
        </section>
    );
}