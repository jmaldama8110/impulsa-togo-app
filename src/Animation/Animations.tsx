
import { CreateAnimation, createAnimation } from '@ionic/react';

const AnimationBuilder = (baseEl: any, opts: { enteringEl: Element | Node | Element[] | Node[] | NodeList; leavingEl: Element | Node | Element[] | Node[] | NodeList; }) => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo('opacity', 0.7, 1)
    .duration(350);

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo('transform', 'translateX(0%)', 'translateX(100%)')
    .duration(350);

  // eslint-disable-next-line no-unused-vars
  const custom = <CreateAnimation
  duration={1500}
  iterations={Infinity}
  fromTo={[
    { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(100px)' },
    { property: 'opacity', fromValue: '1', toValue: '0.2' }
  ]}
>
  ...
</CreateAnimation>;
  const animation = createAnimation()
    .addAnimation(enteringAnimation).addAnimation(leavingAnimation);

  return animation;
};

export default AnimationBuilder;
