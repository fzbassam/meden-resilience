import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitDemoRequest } from "@/hooks/useQueries";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const {
    mutate: submitRequest,
    isPending,
    isSuccess,
    reset,
  } = useSubmitDemoRequest();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRequest(formData);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
      setFormData({ name: "", email: "", organization: "", message: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            data-ocid="demo.modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            <div
              className="relative rounded-2xl border border-glow overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.12 0.04 255 / 0.97) 0%, oklch(0.10 0.03 255 / 0.97) 100%)",
                boxShadow:
                  "0 0 0 1px oklch(0.88 0.18 196 / 0.2), 0 25px 80px -12px oklch(0.07 0.025 255), 0 0 60px oklch(0.88 0.18 196 / 0.08)",
              }}
            >
              {/* Header glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.88 0.18 196), transparent)",
                }}
              />

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse-glow" />
                      <span className="text-xs font-mono text-neon-cyan tracking-widest uppercase">
                        Accès Plateforme
                      </span>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      Demander une Démo Technique
                    </h2>
                  </div>
                  <button
                    type="button"
                    data-ocid="demo.close.button"
                    onClick={handleClose}
                    className="p-2 rounded-lg text-muted-foreground hover:text-neon-cyan hover:bg-white/5 transition-all duration-200"
                    aria-label="Fermer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    /* Success state */
                    <motion.div
                      data-ocid="demo.success_state"
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center text-center py-8 gap-4"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full glow-cyan animate-pulse-glow" />
                        <CheckCircle2
                          size={56}
                          className="text-neon-cyan relative z-10"
                        />
                      </div>
                      <h3 className="text-xl font-display font-semibold text-foreground">
                        Demande envoyée avec succès !
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-sm">
                        Votre demande a bien été envoyée. Notre équipe vous
                        contactera dans les{" "}
                        <span className="text-neon-cyan font-semibold">
                          48 heures
                        </span>
                        .
                      </p>
                      <Button
                        onClick={handleClose}
                        className="mt-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20"
                      >
                        Fermer
                      </Button>
                    </motion.div>
                  ) : (
                    /* Form */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="demo-name"
                          className="text-sm font-medium text-muted-foreground"
                        >
                          Nom complet
                        </Label>
                        <Input
                          id="demo-name"
                          data-ocid="demo.name.input"
                          type="text"
                          placeholder="Votre nom et prénom"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          className="bg-white/5 border-white/10 focus:border-neon-cyan/50 focus:ring-neon-cyan/20 text-foreground placeholder:text-muted-foreground/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="demo-email"
                          className="text-sm font-medium text-muted-foreground"
                        >
                          Email professionnel
                        </Label>
                        <Input
                          id="demo-email"
                          data-ocid="demo.email.input"
                          type="email"
                          placeholder="vous@organisation.ma"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          className="bg-white/5 border-white/10 focus:border-neon-cyan/50 focus:ring-neon-cyan/20 text-foreground placeholder:text-muted-foreground/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="demo-org"
                          className="text-sm font-medium text-muted-foreground"
                        >
                          Organisation
                        </Label>
                        <Input
                          id="demo-org"
                          data-ocid="demo.org.input"
                          type="text"
                          placeholder="Ministère / Agence / Entreprise"
                          required
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              organization: e.target.value,
                            }))
                          }
                          className="bg-white/5 border-white/10 focus:border-neon-cyan/50 focus:ring-neon-cyan/20 text-foreground placeholder:text-muted-foreground/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="demo-message"
                          className="text-sm font-medium text-muted-foreground"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="demo-message"
                          data-ocid="demo.message.textarea"
                          placeholder="Décrivez votre contexte et vos besoins en gestion de l'eau..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                          className="bg-white/5 border-white/10 focus:border-neon-cyan/50 focus:ring-neon-cyan/20 text-foreground placeholder:text-muted-foreground/50 resize-none"
                        />
                      </div>

                      <Button
                        data-ocid="demo.submit.button"
                        type="submit"
                        disabled={isPending}
                        className="w-full font-semibold text-base py-6 relative overflow-hidden group"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.88 0.18 196) 0%, oklch(0.70 0.22 210) 100%)",
                          color: "oklch(0.07 0.02 255)",
                          boxShadow: "0 0 20px oklch(0.88 0.18 196 / 0.4)",
                        }}
                      >
                        {isPending ? (
                          <>
                            <span
                              data-ocid="demo.loading_state"
                              className="flex items-center gap-2"
                            >
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Envoi en cours...
                            </span>
                          </>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send size={16} />
                            Envoyer ma demande
                          </span>
                        )}
                        <span
                          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.92 0.18 196) 0%, oklch(0.75 0.22 210) 100%)",
                          }}
                        />
                      </Button>

                      <p className="text-xs text-center text-muted-foreground/60">
                        Vos données sont traitées avec la plus stricte
                        confidentialité.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
