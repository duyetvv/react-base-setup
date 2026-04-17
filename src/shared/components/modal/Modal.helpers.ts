export const ROOT_ID = "root";
export const PORTAL_ID = "modal-root";

export const getPortalParent = (): HTMLElement => {
  const root = document.getElementById(ROOT_ID);

  if (root && root.parentElement) {
    return root.parentElement;
  }

  return document.body;
};

export const ensurePortalContainer = (): HTMLElement => {
  const modalRoot = document.getElementById(PORTAL_ID);
  if (modalRoot) {
    return modalRoot;
  }

  const portalElement = document.createElement("div");
  portalElement.id = PORTAL_ID;

  const parent = getPortalParent();
  parent.appendChild(portalElement);

  return portalElement;
};

export const removePortalContainer = (): void => {
  const modalRoot = document.getElementById(PORTAL_ID);

  if (modalRoot && modalRoot?.parentElement) {
    modalRoot.parentElement.removeChild(modalRoot);
  }
};
