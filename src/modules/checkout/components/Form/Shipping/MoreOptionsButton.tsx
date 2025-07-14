import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

import { motion } from "framer-motion";

type MoreOptionsButtonProps = {
  expanded: boolean;
  onClick: () => void;
};

const MoreOptionsButton = ({ expanded, onClick }: MoreOptionsButtonProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggleExpand = () => {
    setIsTransitioning(true);
    onClick();

    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <AnimatePresence>
      {!isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full flex justify-center"
        >
          <Button
            variant="link"
            className="text-brand hover:text-brand/80 cursor-pointer"
            onClick={handleToggleExpand}
          >
            <div className="flex items-center gap-1">
              {expanded ? (
                <>
                  Fechar
                  <ChevronUpIcon className="w-4 h-4 stroke-[3.5px]" />
                </>
              ) : (
                <>
                  Mais opções
                  <ChevronDownIcon className="w-4 h-4 stroke-[3.5px]" />
                </>
              )}
            </div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoreOptionsButton;
