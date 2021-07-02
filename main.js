//fuzz
new Vue({
  el: '#app',
  data() {
    return {
      selectedStreamerSections: [],
      streamerSection: [
        {section: 'Forward Hackle', sectionColor: null, sectionSize: 1, toggle: "Add"},
        {section: 'Forward Station', sectionColor: null, sectionSize: 1, toggle: "Add"},
        {section: 'Back Station', sectionColor: null, sectionSize: 1, toggle: "Add"},
        {section: 'Gill Flare', sectionColor: null, sectionSize: 1, toggle: "Add"},
        {section: 'Tail Hackle', sectionColor: null, sectionSize: 1, toggle: "Add"},
      ],
      camera: '',
      scene: '',
      renderer: '',
      streamer: '',
      forwardHackle: '',
      forwardStation: '',
      backStation: '',
      gillFlare: '',
      tailHackle: '',
      colors: [
        {name: 'turquoise', hsl: 0x47debd},
        {name: 'white', hsl: 0xffffff },
        {name: 'dark purple', hsl: 0x2e044e},
        {name: 'purple', hsl: 0x7821ec },
        {name: 'black', hsl: 0x000000 },
        {name: 'dark green', hsl: 0x56722E },
        {name: 'green', hsl: 0x1E981A },
        {name: 'light green', hsl: 0X5F9448 },
        {name: 'orange', hsl:  0xFFA500 },
        {name: 'red', hsl: 0xE73B1C },
        {name: 'yellow', hsl:  0xfff95d }
      ],
      sizes: [
        {name: '1', value: 1},
        {name: '1.1', value: 1.1},
        {name: '1.2', value: 1.2},
        {name: '1.3', value: 1.3},
        {name: '1.5', value: 1.5},
      ],
    }
  },
  mounted() {
    this.initThreeScene();
  },
  methods: {
    // updateSize: function(){
    //   this.streamerSection.map(item => {
    //     if(this.scene.getObjectByName( item.section ).scale !== 0){
    //       this.scene.getObjectByName( item.section ).scale.set(item.sectionSize, item.sectionSize, item.sectionSize);
    //       console.log("resized!");
    //     }
    //   })
    // },
    init: function(){
      this.scene = new THREE.Scene();
      
      let canvas =  document.getElementById('streamerJS');
      this.renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        canvas: canvas
      });
      this.renderer.antialias = true;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(0x5f6669, 0.5);
      this.renderer.castShadow = true;
      document.body.appendChild(this.renderer.domElement);

      this.camera = new THREE.PerspectiveCamera(35,window.innerWidth/(window.innerHeight * .8),1,100);
      this.camera.position.set(5,-8,40);
      this.camera.lookAt(new THREE.Vector3(-5,-2,0));
    },
    initThreeScene: function(){
      this.init();
      this.makeShapes();
      this.render();
    },
    animate: function() {
      this.streamer.rotation.y += 0.0025;
    },
    render: function() {
      this.animate();
      this.renderer.render(this.scene, this.camera, this.light);
      requestAnimationFrame(this.render);
      this.streamerSection.map(item => {
        if(!this.selectedStreamerSections.includes(item.section)){
          this.scene.getObjectByName( item.section ).visible = false;
            item.toggle = 'Add';
        } else {
          this.scene.getObjectByName( item.section ).setColor(item.sectionColor);
          // this.scene.getObjectByName( item.section ).scale.set(item.sectionSize, item.sectionSize, item.sectionSize);
          // console.log(item.sectionSize);
          if(this.scene.getObjectByName( item.section ).scale !== 0){
            this.scene.getObjectByName( item.section ).scale.set(item.sectionSize, item.sectionSize, item.sectionSize);
          }
          item.toggle = 'Remove';
          this.scene.getObjectByName( item.section ).visible = true;
        }
      });
    },
    makeShapes: function() {
      this.makestreamer();
      this.makeForwardHackle();
      this.makeForwardStation();
      this.makeBackStation();
      this.makeGillFlare();
      this.makeTailHackle();
    },
    makestreamer: function() {
      let shank = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25,0.25,10, 10, 1, false, 0, 2*Math.PI),
        new THREE.MeshBasicMaterial({color: 0x555555})
      );
      let leadEyes = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.5,4, 10, 1, false, 0, 2*Math.PI),
        new THREE.MeshBasicMaterial({color: 0xFFFFFF})
      );
      let leadEyesPupils = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25,0.25,4.25, 10, 1, false, 0, 2*Math.PI),
        new THREE.MeshBasicMaterial({color: 0x111111})
      );
      leadEyes.position.y = -4;
      leadEyes.position.x = 0.5;
      leadEyesPupils.position.y = -4;
      leadEyesPupils.position.x = 0.5;
      leadEyes.rotation.x = Math.PI / 2;
      leadEyesPupils.rotation.x = Math.PI / 2;
      this.streamer = new THREE.Group();
      this.streamer.add(shank);
      this.streamer.add(leadEyes);
      this.streamer.add(leadEyesPupils);
      
      this.light1 = new THREE.DirectionalLight(this.colors.white);
      this.light1.position.set(0.125, 1, 0);
      this.streamer.add(this.light1);
      this.light2 = new THREE.DirectionalLight(this.colors.white);
      this.light2.position.set(-0.125, -1, 0);
      this.streamer.add(this.light2);
      this.streamer.add(new THREE.AmbientLight(this.colors.white));

      this.streamer.rotation.z = -Math.PI/2;
      this.streamer.rotation.x = 0.7;
      this.scene.add(this.streamer);
    },
    makeForwardHackle: function() {
      // this.initThreeScene();
      this.forwardHackle = new FuzzyMesh({
        namo: 'fh',
        geometry: new THREE.SphereGeometry(1, 10, 10),
        materialUniformValues: {
          roughness: 1.0
        },
        config: {
          // hairLength: 10,
          hairRadiusBase: 0.5,
          hairRadialSegments: 3,
          gravity: -5,
          fuzz: 0.5,
        }
      });
      // console.log(this.forwardHackle.config.hairLength);
      // console.log("this.forwardHackle.config.hairLength " + this.forwardHackle.config.hairLength);
      // this.forwardHackle.config.hairLength = item.sectionSize;
      this.forwardHackle.position.y = -3.5;
      this.forwardHackle.name = 'Forward Hackle';
      this.streamer.add(this.forwardHackle);
    },
    makeForwardStation: function() {      
      this.forwardStation = new FuzzyMesh({
        geometry: new THREE.SphereGeometry(1, 5, 5),
        materialUniformValues: {
          roughness: 1.0
        },
        config: {
          hairLength: 4,
          hairRadiusBase: 0.2,
          hairRadialSegments: 3,
          gravity: -4,
          fuzz: 0.5,
        }
      });
      
      this.forwardStation.position.y = -2.5;
      this.forwardStation.name = 'Forward Station';
      this.streamer.add(this.forwardStation);
    },
    makeBackStation: function() {  
      this.backStation = new FuzzyMesh({
        geometry: new THREE.SphereGeometry(0.6, 5, 5),
        materialUniformValues: {
          roughness: 1.0
        },
        config: {
          hairLength: 6,
          hairRadiusBase: 0.2,
          hairRadialSegments: 6,
          gravity: -10,
          fuzz: 0.5,
        }
      });
      
      this.backStation.position.y = 1;
      this.backStation.name = 'Back Station';
      this.streamer.add(this.backStation);
    },
    makeGillFlare: function() {      
      this.gillFlare = new FuzzyMesh({
        geometry: new THREE.SphereGeometry(0.5, 5, 20),
        materialUniformValues: {
          roughness: 1.0
        },
        config: {
          hairLength: 2,
          hairRadiusBase: 0.1,
          hairRadialSegments: 3,
          gravity: -2,
          fuzz: 0.25,
        }
      });
      
      this.gillFlare.position.y = 3;
      this.gillFlare.name = 'Gill Flare';
      this.streamer.add(this.gillFlare);
    },
    makeTailHackle: function() {      
      this.tailHackle = new FuzzyMesh({
        geometry: new THREE.SphereGeometry(0.15, 12, 12),
        materialUniformValues: {
          roughness: 1.0
        },
        config: {
          hairLength: 10,
          hairRadiusBase: 0.1,
          hairRadialSegments: 2,
          gravity: -40,
          fuzz: 0.25,
        }
      });   
      
      this.tailHackle.position.x = 0;
      this.tailHackle.position.y = 5;
      this.tailHackle.name = 'Tail Hackle';
      this.streamer.add(this.tailHackle);
    }
  }
})